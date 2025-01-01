import { Client, Account, ID } from "appwrite";
import configuration from "../lib/configuration.js";
class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(configuration.appwriteUrl).setProject(configuration.projectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password,username }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username);
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password} ) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error) {
            throw error;
        }
    }
     async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Current user is", user);
        }
        return null;
     }
     async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error logging out", error);
        }
     }
}

 const authService = new AuthService();
 export default authService;