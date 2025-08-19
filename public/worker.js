const connections = [];

onconnect = (event) => {
    const port = event.ports[0];
    connections.push(port);

    console.log('A new tab connected!');

    // Listen for messages from a tab
    port.onmessage = (msgEvent) => {
        console.log('Worker received:', msgEvent.data);

        // Send the message to ALL connected tabs
        connections.forEach(conn => {
            conn.postMessage(msgEvent.data);
        });
    };

    port.start(); // Must start the port for messages to flow
};