import fs from "fs";
import path from "path";

class EmailTemplates {
    static verificationEmail(verificationUrl: string) {
        try {
            // Use process.cwd() to get the project root directory
            const templatePath = path.join(
                process.cwd(),
                "src/templates/verificationEmail.html"
            );

            console.log("Looking for template at:", templatePath);

            let template = fs.readFileSync(templatePath, "utf8");

            template = template.replace("{{verificationUrl}}", verificationUrl);

            return template;
        } catch (error) {
            console.error("Error loading email template:", error);
        }
    }

    static welcomeEmail(name: string) {
        try {
            const templatePath = path.join(
                process.cwd(),
                "src/templates/welcomeEmail.html"
            );

            console.log("Looking for template at:", templatePath);

            let template = fs.readFileSync(templatePath, "utf8");

            template = template.replace("{{name}}", name);

            return template;
        } catch (error) {
            console.error("Error loading email template:", error);
        }
    }
}

export default EmailTemplates;
