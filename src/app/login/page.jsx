"use client"
import { Check } from '@gravity-ui/icons';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';
import { redirect } from "next/navigation";


const LogInPage = () => {
    const onSubmit=async(e)=>{
      e.preventDefault();
       const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
       
        const { data, error } = await authClient.signIn.email({
        email:user.email, 
        password:user.password,
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
           toast.success("Login Successful")
           redirect('/')
        },
        onError: (ctx) => {
            toast.error("Login Failed!!!")
        },
});
    }
    return (
        <Card className='flex items-center'>
            <h1 className='font-bold text-2xl text-center'>Log In </h1>
             <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
           
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
        Log In
        </Button>
      </div>
    </Form>
        </Card>
    );
};

export default LogInPage;