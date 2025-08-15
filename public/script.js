async function generateQR() {
    const text = document.getElementById("qrText").value;
    if (!text) {
        alert("Please enter some text");
        return;
    }

    try {
        // Always use the same origin as the frontend
        const apiUrl = window.location.origin + "/generate";

        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();

        if (data.qrImage) {
            document.getElementById("qrResult").innerHTML =
                `<img src="${data.qrImage}" alt="QR Code" />`;
        } else {
            alert("Failed to generate QR code");
        }
    } catch (err) {
        console.error("Error generating QR:", err);
        alert("Error: " + err.message);
    }
}
