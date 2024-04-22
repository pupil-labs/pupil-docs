# Heatmap

The output of the [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) and [Marker Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/marker-mapper/) Enrichments can be visualized as a traditional Heatmap. This shows you which parts of your reference image or surface were gazed at more often by an observer.

For example, below and to the left is a view of a kitchen that was used as a reference image. On the right, you can see the output of the Heatmap Visualization for a recording that was made while the observer was preparing ingredients.

![An example of a heatmap from Pupil Cloud. On the left is a photo of a kitchen countertop. On the right is the same photo with a gaze heatmap overlayed.](heatmap_example.png)

The Heatmap is a Gaussian blurred 2D histogram of gaze data from all selected recordings. No normalization for recording time is performed, so longer recordings will carry more weight and contribute more to the Heatmap.

The colors in the Visualization map to the range 0-100%, as shown by the color bar to the right of the Visualization, where 0 means a point was never gazed at and 100% means it had the longest gaze duration.

The output of the Heatmap Visualization is two image files: one image with just the Heatmap and another where it is overlayed on the reference image.

:::: details Click for implementation steps

1. Compute the 2D histogram over the raw gaze data of all recordings. The histogram has the same aspect ratio as the reference image, with the wider side set to 300 bins:
    
    ```
    gaze_histogram2d = hist2d(gaze_x, gaze_y, bins=[nbins_x, nbins_y])
    ```
    
2. Apply a 2D Gaussian blur to the 2D histogram and normalize the resulting values to the maximum:
    
    ```
    gaze_heatmap = GaussianBlur(gaze_hist2d, 0.01 * scale)
    gaze_heatmap /= max(gaze_heatmap)
    ```
    
3. Resize the Heatmap using Lanczos smoothing interpolation:
    
    ```
    final_heatmap = resize(gaze_heatmap,
                           (ref_img_width, ref_img_height),
                           interpolation=LANCZOS)
    ```

::::