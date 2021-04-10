import axios, {AxiosResponse} from "axios";
import { User } from "../shared/models/user.model";
import {API_URL} from '../shared/constant/env'

export function getUsers(): Promise<AxiosResponse<any>> {
        return axios.get(`${API_URL}users`);
    }


export function updateUser(user: User) {
    const id = user._id;
    const newuser= {...user};
    newuser._id = undefined;
    return axios.put(`${API_URL}users/${id}`, newuser);
}