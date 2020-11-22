import userMapper from "./db/mappers/UserMapper";
import {User} from "./db/tables/User";
import {Role} from "./db/models/Role";
import {Address} from "./db/models/Address";
import {Metadata} from "./db/models/Metadata";
import * as faker from 'faker';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

class Runner {

    public testUserMapper() {
        const argv = yargs(hideBin(process.argv)).string('userId').boolean('create-table').argv;

        if (argv["create-table"]) {
            userMapper.createTableIfNotExists().then(() => {
                console.log("TABLE CREATED SUCCESSFULLY!");
            });
            return;
        }

        if (argv.userId) {
            console.log("userId is -> "+argv.userId);
            const userId:string = argv.userId;
            userMapper.getUser(userId).then(r => {
                console.log("======= USER FOUND AND DETAILS ARE =======");
                console.log(JSON.stringify(r));
                console.log("======= USER FOUND AND DETAILS ARE =======");
            }).catch(e => {
                console.error("======= USER FETCH NOT SUCCESSFUL =======");
            })
            return;
        }

        const user: User = new User();

        const role: Role = new Role();
        role.name = faker.random.arrayElement(["ADMIN", "GUEST"]);

        user.role = role;
        user.email = faker.internet.email();

        const address: Address = new Address();
        address.pin = faker.address.zipCode();
        address.city = faker.address.city();
        address.state = faker.address.state();
        address.value = faker.address.streetAddress();
        address.country = faker.address.country();

        const metadata: Metadata = new Metadata();
        metadata.name = faker.name.findName();
        metadata.addresses = [address];

        user.metadata = metadata;
        userMapper.createUser(user).then((r:User) => {
            console.log("saved user's id is --> "+JSON.stringify(r.id));
        });
    }

}

let runner:Runner = new Runner();

runner.testUserMapper();
