// netlify/functions/getCommits.js
export async function handler(event, context) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const query = `
      {
        user(login: "chathrapathinikhil") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch GitHub data",
        details: err.message,
      }),
    };
  }
}
