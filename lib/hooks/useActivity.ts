"use client";

import { useEffect, useState } from "react";

export function useActivity() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch("/data/activity.json")
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    }, []);

    return data;
}