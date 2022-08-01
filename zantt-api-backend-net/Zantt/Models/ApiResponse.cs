﻿namespace Zantt.Models;

public class ApiResponse<T>
{
    public bool Success { get; set; } = true;

    public string? ErrorMessage { get; set; }

    public string? ErrorCode { get; set; }

    public T? Data { get; set; }
}
