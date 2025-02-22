import axios from 'axios';

const CATEGORIES = [
    'politics', 'crypto', 'tech', 'gossip', 'business',
    'sports', 'education', 'football', 'nigeria-politics', 'nigeria-news'
];

async function fetchRedditTrends(): Promise<Record<string, any[]>> {
    const trends: Record<string, any[]> = {};
    
    for (const category of CATEGORIES) {
        try {
            const url = `https://www.reddit.com/r/${category}/hot.json?limit=5`;
            const response = await axios.get(url);
            const posts = response.data?.data?.children || [];

            trends[category] = posts.map((child: any) => ({
                title: child.data.title,
                url: `https://www.reddit.com${child.data.permalink || ''}`
            }));
        } catch (error) {
            console.error(`Error fetching ${category} trends:`, error);
            trends[category] = []; // Ensure category key exists even if empty
        }
    }
    
    return trends;
}

export default fetchRedditTrends;
