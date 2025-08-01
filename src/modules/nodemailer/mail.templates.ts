import * as moment from 'moment-jalaali';

export const activationEmailTemplate = (activationLink: string): string => `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; direction: rtl; text-align: right;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <h2 style="color: #333333;">فعالسازی حساب کاربری</h2>
        <p style="font-size: 16px; color: #555555;">برای فعال‌سازی حساب خود، لطفاً روی دکمه زیر کلیک کنید:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${activationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
            فعال‌سازی حساب
          </a>
        </div>
        <p style="font-size: 14px; color: #888888;">اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaaaaa;">
        © 2025 YourApp. همه حقوق محفوظ است.
      </div>
    </div>
  `;

export const loginEmailTemplate = (email: string): string => `
    <div style="font-family: Tahoma, Arial, sans-serif; background-color: #f4f4f4; padding: 20px; direction: rtl; text-align: right;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #d9534f;">ورود جدید به حساب شما!</h2>
        <p style="font-size: 16px; color: #333;">
          یک ورود جدید به حساب شما با ایمیل 
          <strong>${email}</strong> 
          در تاریخ 
          <strong>${moment().format('jYYYY/jMM/jDD [ساعت] HH:mm')}</strong> 
          انجام شده است.
        </p>
        <p style="font-size: 14px; color: #555;">
          اگر این اقدام توسط شما نبوده است، لطفاً در اسرع وقت رمز عبور خود را تغییر دهید و پشتیبانی را مطلع سازید.
        </p>
        <div style="margin-top: 30px; text-align: center;">
          <a href="https://yourapp.example.com/security" style="background-color: #d9534f; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 15px;">
            بررسی امنیت حساب
          </a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
        © 2025 YourApp. همه حقوق محفوظ است.
      </div>
    </div>
  `;
