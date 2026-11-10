import { ActionButton, type ActionButtonProps } from './ActionButton';

export function PrimaryButton(props: ActionButtonProps) {
  return <ActionButton {...props} variant="primary" />;
}
