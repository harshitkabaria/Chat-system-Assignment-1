1.	Organization of Git repository

During the creation of the chat application, GitHub was used. The documentation for our project is stored in the README.md file of the git repository. The goal of utilising the git repository is to keep track of the modifications made to the application's directory. If something goes wrong, it might assist you get back to the application's functional stage. The repository also aids in providing simple access to others, such as the maker, for assessment, by displaying the development flow across multiple commits. For the chat application, the repository is divided into frontEnd and backEnd directories. This directory is lacking node modules in order to keep the repository's size down. As a result, npm install is required to execute the chat application properly.

GitHub Link: https://github.com/harshitkabaria/Chat-system-Assignment-1




2.	Data Structures

I have used different type of data structure to create my chat application. I have used objects and array for various purposes.

2.1.	Client side
    To represent users, group and channel, I have created models inside client-side application. The structure of these entities is as shown below:
    User
    •	id: Number
    •	name: String
    •	email: String
    •	role: Number

    Groups
    •	id: Number
    •	name: String
    •	channel: Array[channelId]
    •	users: Array[userId]
    •	assis: Array[userId]
    Channel
    •	id: Number
    •	group: Number
    •	name: String
    •	users: Array[userId]

    2.2.	Server side
    A.	To create users, I have used object JSON to retrieve and represent user data. The structure for user data as shown below:
    User
    •	id: Number
    •	name: String
    •	email: String
    •	role: Number

    B.	For groups I have used object JSON and array. For channels and user of that particular group I have used array to retrieve information about both. The structure of groups as shown below:
    Groups
    •	id: Number
    •	name: String
    •	channel: Array
    •	users: Array
    •	assis: Array

    C.	For channels I have used object JSON and array. To represent users in that channel I have used array to store userId. The structure of channel as shown below:
    Channel
    •	id: Number
    •	group: Number
    •	name: String
    •	users: Array





3.	Angular Architecture
The angular architecture is divided into components, services, model and routes. 

    3.1.	Components
    •	Login – login component consists of html template of login page and its ts file represent the function for login page. 
    •	Admin – admin component is responsible for all the data operation like create group admin, assign group assist, create users and channels and invite user to the channels
    •	ChatBox – chatbox component is responsible for chatbox of channel users 

    3.2.	Services
    •	SocketService - gets the socket from server, emits a message socket is called, allows observers to also view message. To communicate with other users and server socket, thus this service has been used

    3.3.	Model
    •	Users – it represents the object of user data
    •	Groups – it represents the object of group data 
    •	Channels – it represents the object of channel data


    3.4.	Routes
    •	/login – this route return login page of the chat application. It is only accessible if user is not logged in, on the other hand if the user is logged in, it redirects to dashboard page 

    •	/dashboard – this route returns admin page of chat application. There are number of cases to access this route:
        o	If user is super admin, the user can access all the functionality. 
        o	If user is group admin, the user can access all the functionality to groups like create group, assign group assist, create channels and assign user into specific channel
        o	If user is group assist, the user can access information about particular groups and channels. Additionally, user can assign other users in channels for the respective group
        o	If user is normal user, the user can access the information about the group and channel that they belong
        o	If user is not logged in, it redirects to login page

    •	/chat – this route returns chat box for particular group and channel of logged in user. If user is not logged in, it redirects to login page



4.	Node Server Architecture
Node server architecture is mainly divided into two files:
    •	Socket.js – this file contains function for socket connectivity
    •	Index.js – this file contains all routes function and variables for chat application. 

    Routes provided, parameters, return values are explained later in this documentation.
    There are three JSON files which represents user, group and channel data.
    
    
5.	Responsibilities between client and server

    The client side is responsible for serving HTML design files and its functionality of route protection, data manipulation, send HTTP request to server and store responses of the REST API data and store into local storage.

    Local storage in client side is used for store user channel and group data.

    Socket service in client side is used for communication between users.

    The server side handle all the request of client request API and send respective response to client side. To fulfil this purpose in server side, routes has been created and its detail is explained in next section. Server is also responsible for store, retrieve and update data into JSON data file.

6.	List of routes, parameters, return values and purpose in the server side

| api Routes | Parameters | Return value | Purpose |
|--------|-------------|----------|----------|
| /api/auth | None | Boolean | This authenticates the user login |
| /api/userRegistration | None | Copy of that user data | It adds user to the system |
| /api/getAllUsers | None | Array of users |To get all user from the system |
| /api/users/:userId | userId |Specific user assigned to that user Id | Each user has unique id, once the id is called to return to respective user |
| /api/addGroup | None | Return a copy of that group data | To add a new group to the system |
| /api/groups | None | Array of group |To get all the group from the system |
| /api/channels | None | Array of channel | To get all the channels from the system |
| /api/groups/user/:userId | userId | Specific users that are added into specific group | To get all groups for the unique user using userId |
| /api/inviteUser | None | Return channel data for that user | To invite user to the channel |
| /api/channels/:channelId | channelId | Return specific channel data | To get specific channel information |
| /api/channels/:channelId/users/:userId | channelId & userId | Returns channel data for that user | To get the particular user from the specific channel |
| /api/group/:groupId/channel | groupId | Return all the channel for that group | To get the channels for specific groups |

Note: If any error occurs it return error in JSON format to client site and success flag as false



7.	Integration between client and server

    The client-side routing works based on roles given to the user. This role returns by server API communication, this data stored in server side JSON file and can be modify in server side by request from client side. If server return user role as super admin, then client-side admin dashboard fully accessible by that user. If any changes in roles from client side, then user restriction for client-side routing apply.

    If user login detail is correct then user can access Chat Box, groups and channel details. If server return success flag as false, then user cannot login to chat application.

    When super admin sends request to create groups or channels or users in the server side JSON data files updates respectively. 

    If user clicks logout button, then no interaction between client and server. It only clears local storage data in client side.
