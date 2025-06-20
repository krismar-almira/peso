<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSRP-1 Form</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            background-color: #f8f9fa;
        }
        .section-title {
            background-color: #e9ecef;
            padding: 10px;
            font-weight: bold;
            margin-top: 20px;
            border-radius: 5px;
        }
        .container {
            max-width: 900px;
        }
        h2 {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
   <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">

            {{-- Bootstrap success alert --}}
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> NSRP-2 form has been successfully saved.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
{{-- 
            <a href="/nsrp2" class="btn btn-primary mt-3">Submit Another Form</a> --}}
        </div>
    </div>
</div>
</body>
</html>