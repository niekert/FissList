import * as React from 'react';
import { DeviceInfo } from 'fragments/__generated__/DeviceInfo';

interface IProps {
  activeDevice?: DeviceInfo;
  devices?: DeviceInfo[];
  isPlaying: boolean;
}

export default function Devices({
  activeDevice,
  devices = [],
  isPlaying,
}: IProps) {
  console.log('active', activeDevice, devices);
  return <div>Your devices</div>;
}
