import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import * as io from "socket.io-client";
// import { nextTick } from 'process';

const SERVER_URL = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})

export class SocketServiceService {
    private socket!: { id: any; emit: (arg0: string, arg1: string) => void; on: (arg0: string, arg1: { (res: any): any; (res: any): any; (res: any): any; (res: any): any; (res: any): any; (res: any): any; (res: any): any; (res: any): any; (res: any): any; }) => void; };

    public GetID() {
        return this.socket.id;
    }
    constructor() { }

    // TODO: change user and chat functionality to namespaces for easy of use and understandability


    //
    //  User
    //  
    public ReqLogin(username: string) {
        console.log(username)
        this.socket.emit("login", username);
        console.log("Login Request emited with username: " + username);
    }

    public GetLogin(callback: (arg0: any) => any) {
        console.log("Login Request recieved");
        this.socket.on("login", (res: any) => callback(res));
    }

    // public UserLogout(username: string) {
    //     this.socket.emit("Logout", username);
    //     console.log("Logout username: " + username);
    // }

    // public CreateNewUser(user: any) {
    //     this.socket.emit("CreateNewUser", user);
    //     console.log("CreateNewUser emitted: " + JSON.stringify(user));
    // }

    // public DeleteUser(username: any) {
    //     this.socket.emit("DeleteUser", username);
    //     console.log("Delete User emitted: " + JSON.stringify(username));
    // }

    // public CreateNewGroup(groupName: string) {
    //     this.socket.emit("CreateNewGroup", groupName);
    //     console.log("CreateNewGroup emitted: " + groupName);
    // }
    // public CreateNewRoom(newRoomName: string, addToGroup: string){ 
    //     this.socket.emit("CreateNewRoom", newRoomName, addToGroup);
    //     console.log("CreateNewRoom emitted: " + newRoomName + "  -  " + addToGroup);
    // }

    // public AddUserToGroup(userName: any, groupName: any) {
    //     this.socket.emit("AddUserToGroup", userName, groupName);
    // }

    // public ReqGroupList() {
    //     this.socket.emit("GetGroupList", "");
    // }

    // public GetGroupList(callback: (arg0: any) => any) {
    //     this.socket.on("GetGroupList", (res: any) => callback(res));
    // }
    
    // public ReqTheGroupList() {
    //     this.socket.emit("GetTheGroupList", "");
    // }
    // public GetTheGroupList(callback: (arg0: any) => any) {
    //     this.socket.on("GetTheGroupList", (res: any) => callback(res));
    // }
    // public ReqUserList() {
    //     this.socket.emit("GetUserList", "");
    // }

    // public GetUserList(callback: (arg0: any) => any) {
    //     this.socket.on("GetUserList", (res: any) => callback(res));
    // }
    
    // public ReqError() {
    //     this.socket.emit("ErrorMessage", "");
    // }

    // public GetError(callback: (arg0: any) => any) {
    //     this.socket.on("ErrorMessage", (res: any) => callback(res));
    // }
    // //
    // //  Chat
    // //
    // public InitSocket(): void {
    //     this.socket = io(SERVER_URL);
    // }

    // public JoinRoom(selectedRoom: any) {
    //     this.socket.emit("joinRoom", selectedRoom);
    // }

    // public LeaveRoom(selectedRoom: any) {
    //     this.socket.emit("leaveRoom", selectedRoom);
    // }

    // public Joined(callback: (arg0: any) => any) {
    //     this.socket.on("joined", (res: any) => callback(res)); 
    // }

    // public CreateRoom(newRoom: any) {
    //     this.socket.emit("newRoom", newRoom);
        
    // }

    // public ReqNumberOfUsers(selectedRoom: any) {
    //     this.socket.emit("numberOfUsers", selectedRoom);
    // }

    // public GetNumberOfUsers(callback: (arg0: any) => any) {
    //     this.socket.on("numberOfUsers", (res: any) => callback(res));
    // }

    // public RequestRoomList() {
    //     this.socket.emit("roomList","")
    // }

    // public GetRoomList(callback: (arg0: any) => any) {
    //     this.socket.on("roomList", (res: any) => callback(res));
    // }

    // public SendMessage(message:string): void {
    //     this.socket.emit("message",message);
    // }

    // public GetMessage(callback: (arg0: any) => any) {
    //     this.socket.on("message", (res: any) => callback(res));
    // }

    // public OnMessage(): Observable<any> {
    //     let observable = new Observable(observer=>{
    //         this.socket.on("message", (data:string) => observer.next(data));
    //     });
    //     return observable;
    // }
}

