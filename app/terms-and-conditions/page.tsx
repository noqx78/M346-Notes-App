import Link from "next/link";

export default function TermsAndConditions() {
    return (
        <>
            <h1>Terms And Conditions</h1>
            <br></br>
            <p className="text-sm -foreground">
                By using this application, you agree to the following rules: <br />
                - Do not exploit bugs or vulnerabilities. <br />
                - Do not perform denial-of-service (DDoS) attacks. <br />
                - Do not spam, abuse, or overload any API endpoints. <br />
                - Respect other users and their data. <br />
                - Any violation may result in account suspension or deletion.
            </p>
            <br></br>
            <p>----</p>
            <Link href="/" >
                <p className="text-sm -foreground">Navigate Home</p></Link>

        </>
    );
}