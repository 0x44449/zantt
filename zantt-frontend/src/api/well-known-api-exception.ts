class WellKnownApiException extends Error {
  constructor(public errorMessage: string, public errorCode: string) {
    super(errorMessage);
  }
}

export default WellKnownApiException;