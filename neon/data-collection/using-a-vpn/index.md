# Using a VPN for Remote Data Collection

When conducting research, data collection may involve participants who are off-site, in non-accessible locations, or geographically distant. A Virtual Private Network (VPN) can be used to securely extend the reach of the Realtime API or Monitor App over the internet.

## How it works?

Rather than routing traffic through a central server like traditional VPNs, modern device-to-device VPNs also permit the creation of a secure mesh network. By connecting both a computer and a Companion Device to this mesh network, the devices establish a direct, peer-to-peer connection. This creates a virtual local network, allowing the devices to communicate securely and seamlessly as though they were connected to the same physical Wi-Fi router, despite their actual geographic locations.

![Using a VPN](./vpn.webp)

::: tip Tested VPN Solutions
Any VPN service that supports device-to-device connections or mesh networking can be used. While no specific provider is officially endorsed, this setup has been successfully tested using [Tailscale](https://tailscale.com/).
:::
