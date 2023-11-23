# Workspaces
Workspaces are large containers for your data and enable you to share data in Pupil Cloud with your collaborators. All data in Pupil Cloud is part of a workspace and the workspace owner can control access to it. A workspace can contain multiple projects. All recordings, wearers, templates, labels, and enrichments are isolated within a workspace and can not exist in another workspace at the same time.

### Access Control
Only accounts that have been invited to become members of a workspace are granted access to the data in a workspace. For more fine-grained control of what each member is allowed to do, they can be assigned different roles:

- **Viewer**: This role can view all data, but they are not allowed to edit anything. For example, a viewer can download data, playback recordings, and view heatmaps. A viewer can not delete any data, create projects, or start compute jobs.
- **Editor**: This role has full read and edit access to all data in the workspace, which includes the ability to create enrichments, start compute jobs and delete data.
- **Admin**: Has all permissions of an editor and additionally can invite and remove workspace members and change workspace members' roles.
- **Owner**: The owner of a workspace is the one who initially created the workspace. Owners have all permissions of an Admin. The owner of a workspace can not be changed.

Public sharing of data with people outside of a workspace is **not** currently possible.

### Frequently Asked Questions

**When should I use workspaces?**

Workspaces can have many uses. Typical ones include:
- **Projects or Studies**: Use workspaces to collect projects with a similar theme, "Sport Training" for example. Then every project within the workspace can be used to catalog recordings of different sports, like "Golf Putting", "Archery", "Basketball Free Throw". This ensures data is cleanly separated.
- **Teams**: If you are a member of multiple teams or organizations, you can use multiple workspaces to control what data you are sharing with whom.
- **Clients**: If you are working with clients, you can use multiple workspaces to keep data separated and to control which collaborator should have access to which client’s data.
 
**Is there a limit to the number of workspaces I can create?**

No, you can create as many workspaces as you want!

**Can I move recordings between workspaces?**

No, currently this is not possible.

**Can the ownership of a workspace be transferred?**

This is not currently possible in the app. Please make a request if this is needed via email to `info@pupil-labs.com`.

### Demo Workspace

Every user of Pupil Cloud has access to the [Demo Workspace](https://cloud.pupil-labs.com/workspace/78cddeee-772e-4e54-9963-1cc2f62825f9). It contains example projects that can be explored to understand all the features of Pupil Cloud and see them in the context of actual projects. Over time, we will add more projects that illustrate additional features and use cases.

The existing projects in the demo workspace can not be edited. However, you can create new projects using the existing recordings and within those, you can create enrichments and events, and play around with all the features. Things you create and edit in the demo workspace are only visible to you and nobody else.

You can not upload your own recordings to the demo workspace. You can delete all the things you have created, but none of the pre-existing projects or recordings.
