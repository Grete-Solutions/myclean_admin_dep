import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { settingName, settingValue, settingType } = await req.json();
    console.log(settingName, settingValue, settingType);

    // Ensure the settingType is "number" and settingValue is a number
    if (settingType !== 'number' || typeof settingValue !== 'number') {
      throw new Error('Invalid setting type or value');
    }

    const response = await fetch(`${process.env.URLB}/systemSettings/createOrUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settingName, settingValue, settingType }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Backend error: ${data.message || 'Unknown error'}`);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    return NextResponse.json({ message: 'Error saving setting' }, { status: 500 });
  }
}
