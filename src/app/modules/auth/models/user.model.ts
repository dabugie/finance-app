interface FirebaseUser {
    uid: string;
    name: string;
    email: string;
    createdAt: any;
    updatedAt: any;
    photoURL?: string;
}

export class User {
    static fromFirebase({
        uid,
        name,
        email,
        createdAt,
        updatedAt,
        photoURL,
    }: FirebaseUser) {
        const createdAtDate =
            createdAt instanceof Date
                ? createdAt
                : new Date(createdAt.seconds * 1000);
        const updatedAtDate =
            updatedAt instanceof Date
                ? updatedAt
                : new Date(updatedAt.seconds * 1000);

        return new User(uid, name, email, createdAtDate, updatedAtDate, photoURL);
    }

    toPlainObject() {
        return {
            uid: this.uid,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            photoURL: this.photoURL,
        };
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public createdAt: Date,
        public updatedAt: Date,
        public photoURL?: string
    ) { }
}
