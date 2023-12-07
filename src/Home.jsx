import { useEffect, useState } from "react";
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function Home() {
    const [search, setSearch] = useState('');
    const [lists, setLists] = useState([]);
    const [filteredLists, setFilteredLists] = useState([]);

    const handleSearch = () => {
        const filtered = lists.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredLists(filtered);
    };
    useEffect(() => {
        handleSearch();
    }, [search]);
    useEffect(() => {
        fetch("https://653f72d89e8bd3be29e095a1.mockapi.io/Post")
            .then((data) => data.json())
            .then((list) => setLists(list));
    }, []);

    const handleLike = async (postId) => {
        try {
            const response = await fetch(`https://653f72d89e8bd3be29e095a1.mockapi.io/Post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ like: lists.find(item => item.id === postId).like + 1 }),
            });

            if (response.ok) {
                const updatedList = lists.map(item =>
                    item.id === postId ? { ...item, like: item.like + 1 } : item
                );
                setLists(updatedList);
            } else {
                console.error('Failed to update like on the server');
            }
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };

    const handleDislike = async (postId) => {
        try {
            const response = await fetch(`https://653f72d89e8bd3be29e095a1.mockapi.io/Post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dislike: lists.find(item => item.id === postId).dislike + 1 }),
            });

            if (response.ok) {
                const updatedList = lists.map(item =>
                    item.id === postId ? { ...item, dislike: item.dislike + 1 } : item
                );
                setLists(updatedList);
            } else {
                console.error('Failed to update dislike on the server');
            }
        } catch (error) {
            console.error('Error updating dislike:', error);
        }
    };

    return (
        <div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search of Title"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <h1 style={{ textAlign: 'left' }}>List of Posts</h1>
            <div className="list">
                {
                    lists.map(l => (
                        <div key={l.id}>
                            <h3>{l.title}</h3>
                            <p>Likes: {l.like}</p>
                            <MDBBtn className='me-1' color='success' onClick={() => handleLike(l.id)}>
                                <MDBIcon fas icon="thumbs-up" /> Like
                            </MDBBtn><br /><br />
                            <p>Dislike: {l.dislike}</p>
                            <MDBBtn className='me-1' color='danger' onClick={() => handleDislike(l.id)}>
                            <MDBIcon fas icon="thumbs-down" /> Dislike
                            </MDBBtn>
                        </div>
                    ))
                }
            </div>
            {filteredLists.length > 0 && (
                <>
                    <hr />
                    <h1 style={{ textAlign: 'left' }}>Search Results</h1>
                    <div className="list">
                        {filteredLists.map(l => (
                            <div key={l.id}>
                                <h3>{l.title}</h3>
                                <p>Likes: {l.like}</p>
                                <p>Dislike: {l.dislike}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
