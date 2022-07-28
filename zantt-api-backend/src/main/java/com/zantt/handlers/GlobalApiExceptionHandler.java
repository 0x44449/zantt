package com.zantt.handlers;

import com.zantt.exceptions.WellKnownApiException;
import com.zantt.models.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalApiExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = { WellKnownApiException.class })
    protected ResponseEntity<ApiResponse<Object>> handleWellKnownApiException(WellKnownApiException e) {
        var response = new ApiResponse<>(null);
        response.setSuccess(false);
        response.setErrorMessage(e.getMessage());
        response.setErrorCode(e.getErrorCode());
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(value = { Exception.class })
    protected ResponseEntity<ApiResponse<Object>> handleException(Exception e) {
        var response = new ApiResponse<>(null);
        response.setSuccess(false);
        response.setErrorMessage(e.getMessage());
        response.setErrorCode("500");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(value = { RuntimeException.class })
    protected ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException e) {
        var response = new ApiResponse<>(null);
        response.setSuccess(false);
        response.setErrorMessage(e.getMessage());
        response.setErrorCode("500");
        return ResponseEntity.ok(response);
    }
}
