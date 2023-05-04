package zina.zantt.nabi.Interceptors;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import zina.zantt.nabi.Exceptions.WellKnownApiException;
import zina.zantt.nabi.Models.ApiResult;

@RestControllerAdvice
public class NabiApiExceptionAdvice {
    @ExceptionHandler({WellKnownApiException.class})
    public ResponseEntity<ApiResult<Object>> exceptionHandler(HttpServletRequest request,
                                                              final WellKnownApiException e) {
        var apiResult = new ApiResult<>(false, e.getErrorMessage(), null);
        return ResponseEntity.status(200).body(apiResult);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiResult<Object>> exceptionHandler(HttpServletRequest request,
                                                              final Exception e) {
        var apiResult = new ApiResult<>(false, e.getMessage(), null);
        return ResponseEntity.status(200).body(apiResult);
    }
}
