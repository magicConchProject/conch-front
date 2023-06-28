"use client";

import { Toaster } from "react-hot-toast";

export default function MyToaster() {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
