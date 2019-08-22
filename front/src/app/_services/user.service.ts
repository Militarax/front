import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${environment.baseUrl}users/`).toPromise();
    }

    getById(id: number) {
        return this.http.get(`${environment.baseUrl}users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.baseUrl}register/`, user).toPromise();
    }

    update(user: User) {
        return this.http.put(`${environment.baseUrl}users/update/${user.id}/`, user).toPromise();
    }

    delete(id: number) {
        return this.http.delete(`${environment.baseUrl}users/delete/${id}/`).toPromise();
    }

}
