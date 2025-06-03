import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps as ExpoIconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

interface IconProps extends ExpoIconProps<ComponentProps<typeof Ionicons>['name']> {
  name: ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
}

export function Icon({ size = 24, ...props }: IconProps) {
  return <Ionicons size={size} {...props} />;
}
