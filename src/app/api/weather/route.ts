import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://rss.weather.gov.hk/rss/CurrentWeather.xml', {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const xmlData = await response.text();

    // Extract temperature for Hong Kong Observatory
    const observatoryMatch = xmlData.match(/Air temperature : (\d+) degrees Celsius/);

    if (!observatoryMatch) {
      throw new Error('Temperature data not found');
    }

    const temperature = parseInt(observatoryMatch[1]);

    // Extract last update time
    const timeMatch = xmlData.match(/Bulletin updated at ([^<]+)/);
    const lastUpdated = timeMatch ? timeMatch[1] : '2 p.m. HKT';

    const weatherData = {
      temperature,
      location: 'Hong Kong',
      lastUpdated,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
