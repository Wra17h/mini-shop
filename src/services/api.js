const headers = { "Content-Type": "application/json" };

const fetchData = async () => {
    return  await fetch("/data.json", { headers });
};

const fetchNames = async () => {
    return await fetch("/names.json", { headers });
};


export { fetchNames, fetchData };
