import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const cookies = req.cookies.getAll();
    let parsedCookies = cookies.map(cookie => {
        return `${cookie.name}=${cookie.value}`;
    })

    try {
        await axios.get("http://api.mykid.lc/api/user", {
            headers: {
                Cookie: parsedCookies.join("; "),
                Accept: "application/json",
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
    } catch (err) {
        console.log(err);
    }
}
