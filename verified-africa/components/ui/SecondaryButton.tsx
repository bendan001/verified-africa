import { ActionButton, type ActionButtonProps } from './ActionButton';

export function SecondaryButton(props: ActionButtonProps) {
  return <ActionButton {...props} variant="secondary" />;
}
