async function generateQR() {
    const text = document.getElementById("qrText").value;
    if (!text) {
        alert("Please enter some text");
        return;
    }

    const res = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const data = await res.json();
    if (data.qrImage) {
        document.getElementById("qrResult").innerHTML =
            `<img src="${data.qrImage}" alt="QR Code" />`;
    } else {
        alert("Failed to generate QR code");
    }
}
