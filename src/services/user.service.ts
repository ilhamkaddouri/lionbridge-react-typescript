import Axios, {AxiosResponse} from "axios";
import { User } from "../shared/models/user.model";

export function getUsers(): Promise<AxiosResponse<any>> {
        return Axios.get('http://localhost:5000/users');
    }


export function updateItem(user: User) {
    const id = user._id;
    console.log(user)
    console.log("id"+id)
    const obj = {...user};
    obj._id = undefined;
    return Axios.put('http://localhost:5000/users/' + id, obj);
}