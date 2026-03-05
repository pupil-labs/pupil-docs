# Using a VPN for Remote Data Collection

In some research scenarios, participants may be located off-site, in restricted environments, or geographically distant from the researcher. Thus, one can not rely on devices being connected to the same local network.

A Virtual Private Network (VPN) can help overcome this limitation by securely extending the reach of the Realtime API or Monitor App over the internet, allowing devices in different locations to communicate as if they were on the same network.

## How it works?

Instead of routing all traffic through a central server like traditional VPNs, some modern VPN solutions allow devices to connect directly to each other through a secure mesh network. By joining both the host computer and the Companion Device to the same mesh network, the devices establish an encrypted peer-to-peer connection.

This effectively creates a virtual local network. As a result, the devices can communicate securely and seamlessly, just as they would if they were connected to the same physical Wi-Fi router, even when they are located in different places.

![Using a VPN](./vpn.webp)

::: tip Tested VPN Solutions
Any VPN service that supports device-to-device connections or mesh networking can be used. While no specific provider is officially endorsed, this setup has been successfully tested using [Tailscale](https://tailscale.com/).
:::
