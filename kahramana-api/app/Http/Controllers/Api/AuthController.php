<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate(['name'=>'required','email'=>'required|email|unique:users','password'=>'required|min:6']);
        $user = \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        return response()->json(['id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'role'=>$user->role,'token'=>$user->createToken('api')->plainTextToken], 201);
    }

    public function login(Request $request)
    {
        $request->validate(['email'=>'required|email','password'=>'required']);
        if (!\Illuminate\Support\Facades\Auth::attempt($request->only('email','password')))
            return response()->json(['message'=>'Invalid email or password'], 401);
        $user = \App\Models\User::where('email', $request->email)->first();
        return response()->json(['id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'role'=>$user->role,'token'=>$user->createToken('api')->plainTextToken]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user()->only('id','name','email','role','phone','created_at'));
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        if ($request->name) $user->name = $request->name;
        if ($request->phone) $user->phone = $request->phone;
        if ($request->password) $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'role'=>$user->role,'token'=>$user->createToken('api')->plainTextToken]);
    }
}
