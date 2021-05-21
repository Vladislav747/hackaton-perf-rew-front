type playerError = {
  error: Boolean;
  code: Number;
  message: "";
};
interface PlayerErrorsViewProps {
  error: playerError;
}
