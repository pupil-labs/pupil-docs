import av
import cv2
import numpy as np
from tqdm import tqdm


def _render_onto_image(img, gaze, hr):
    if not np.isnan(gaze[0]):
        gaze = (int(gaze[0]), int(gaze[1]))
        cv2.circle(img, gaze, 50, (0, 0, 255), 5)
    
    cv2.putText(img, f"HR: {hr}", (50,100), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,0,0), 3)

    return img


def make_visualization(matched_data, world_video_path, output_path):
    world_lookup = {}
    for index, packet in enumerate(av.open(world_video_path).demux(video=0)):
        world_lookup[index] = packet







    original_container = av.open(str(world_video_path))
    original_video_stream = original_container.streams.video[0]

    visualization_container = av.open(str(output_path), "w")

    try:
        visualization_video = visualization_container.add_stream("h264_nvenc")
    except Exception as e:
        print("nvenc not available", e)
        visualization_video = visualization_container.add_stream("h264")

    visualization_video.options["bf"] = "0"
    visualization_video.options["movflags"] = "faststart"
    visualization_video.gop_size = original_video_stream.gop_size
    visualization_video.codec_context.height = original_video_stream.height
    visualization_video.codec_context.width = original_video_stream.width
    visualization_video.codec_context.time_base = original_video_stream.time_base
    visualization_video.codec_context.bit_rate = original_video_stream.bit_rate

    progress = tqdm(unit=" frames", total=len(matched_data))
    with visualization_container:
        for _, row in matched_data.iterrows():
            _, frame_index, gaze_x, gaze_y, hr = row

            frame = world_lookup[frame_index].decode()
            try:
                frame = frame[0]
            except IndexError:
                continue

            img = frame.to_ndarray(format="bgr24")
            vis_img = _render_onto_image(img, (gaze_x, gaze_y), hr)

            cv2.imshow("Scene Video + Gaze + Heartrate", vis_img)
            cv2.waitKey(1)
            
            new_frame = frame.from_ndarray(vis_img, format="bgr24")
            new_frame.pts = frame.pts
            new_frame.time_base = original_video_stream.time_base
            packets = visualization_video.encode(new_frame)
            progress.update()
            visualization_container.mux(packets)

        # encode and mux frames that have been queued internally by the encoders
        visualization_container.mux(visualization_video.encode())