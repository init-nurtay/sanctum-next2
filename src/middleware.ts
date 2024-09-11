import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const session = req.cookies.get("laravel_session")?.value;
    const csrf = req.cookies.get("XSRF-TOKEN")?.value;

    try {
        const response = await axios.get("http://api.mykid.lc/api/user", {
            headers: {
                Cookie: `laravel_sesion=${session}`,
                Accept: "application/json, text/plain, */*",
                "X-XSRF-TOKEN": csrf,
                Referer: 'http://admin.mykid.lc/',
                "Content-Type": 'application/json',
                "Host": "api.mykid.lc"
            },
        })

        console.log(response.data);
    } catch (err) {
        const axiosError = err as AxiosError;
        console.log(axiosError.code);
        // console.log(axiosError.cause);
        console.log(axiosError.message);
        console.log(session);
        console.log(csrf);
        return NextResponse.redirect("http://mykid.lc/login");
    }
}
