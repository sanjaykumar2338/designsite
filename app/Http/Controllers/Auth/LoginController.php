<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }

    public function forget(){
        return view('auth.forget');
    }

    public function checkEmail(Request $request)
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            return response()->json([
                'logged_in' => true,
                'message' => 'User is already logged in.'
            ]);
        }

        $email = $request->input('email');

        // Validate the email format
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'exists' => false,
                'valid' => false,
                'logged_in' => false,
                'message' => 'Invalid email format.'
            ]);
        }

        // Check if the email exists in the database
        $emailExists = User::where('email', $email)->exists();

        return response()->json([
            'exists' => $emailExists,
            'valid' => true,
            'logged_in' => false,
            'message' => $emailExists ? 'Email is already taken.' : 'Email is available.'
        ]);
    }
}
