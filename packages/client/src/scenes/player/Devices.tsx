import * as React from 'react';
import styled from 'styled-components';
import DeviceType from 'components/DeviceType';
import { DeviceInfo } from 'fragments/__generated__/DeviceInfo';

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ActiveDeviceWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.textColors.primary};
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const HiddenSelect = styled.select`
  appearance: none;
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
`;

const ChangeDeviceText = styled.span`
  line-height: 1;
  margin-top: ${props => props.theme.spacing[1]};
  font-size: 12px;
`;

interface IProps {
  activeDevice: DeviceInfo | null;
  devices?: DeviceInfo[];
  onDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isPlaying: boolean;
}

export default function Devices({
  activeDevice,
  devices = [],
  onDeviceChange,
}: IProps) {
  const selectRef = React.useRef<any>();
  const onDeviceClick = () => {
    if (selectRef.current) {
      selectRef.current.click();
    }
  };

  return (
    <Wrapper>
      {activeDevice && (
        <ActiveDeviceWrapper onClick={onDeviceClick}>
          <DeviceType type={activeDevice.type} />
          <ChangeDeviceText>{activeDevice.name}</ChangeDeviceText>
          <HiddenSelect
            ref={selectRef}
            value={activeDevice.id || ''}
            onChange={onDeviceChange}
          >
            {devices
              .filter(device => !!device.id)
              .map(device => (
                <option key={device.id!} value={device.id!}>
                  {device.name}
                </option>
              ))}
          </HiddenSelect>
        </ActiveDeviceWrapper>
      )}
    </Wrapper>
  );
}
