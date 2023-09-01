export class Account {
    static fromFirebase({
        accountName,
        accountType,
        accountNumber,
        accountCurrency,
        accountNotes,
        uid,
    }: any) {
        return new Account(
            accountName,
            accountType,
            accountNumber,
            accountCurrency,
            accountNotes,
            uid
        );
    }

    constructor(
        public accountName: string,
        public accountType: string,
        public accountNumber: string,
        public accountCurrency: string,
        public accountNotes: string,
        public uid?: string
    ) { }
}
