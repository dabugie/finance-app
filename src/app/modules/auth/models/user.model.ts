export class User {
    static fromFirebase({ uid, name, email }: any) {
        return new User(uid, name, email);
    }

    constructor(public uid: string, public name: string, public email: string) { }
}
