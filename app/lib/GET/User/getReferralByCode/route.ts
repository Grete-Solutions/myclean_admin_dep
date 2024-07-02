// pages/api/referrals/getReferredUsers/[code].js

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) {
    throw new Error('No referral code provided');
  }

  const res = await fetch(`${process.env.URLB}/referrals/getReferredUsers/${code}`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const product = await res.json();

  return new Response(JSON.stringify({ product }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
