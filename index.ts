#! /usr/bin/env node 

import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

console.log(chalk.bold.italic.bgYellow("**********Welcome to the CountDown Timer**********\n"));

const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Enter the Amount of seconds Under 60",
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.bold.red("Please Enter a Valid Number");
            }
            else if (input > 60) {
                return chalk.bold.red("Seconds must be in 60 Seconds");
            }
            else {
                return true;
            }
        },
    },
]);
let input = res.userInput;
const setTimer = (val: number) => {
    const intialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interalTime = new Date(intialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(interalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.gray("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
};
setTimer(input);