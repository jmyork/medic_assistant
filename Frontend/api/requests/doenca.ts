import { endpoint } from "../apiURL";

export function  getProtocolosDoencaSintomasRequest(token: string) {
    return fetch(endpoint.doencaSintomasQtdProtocolos, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}