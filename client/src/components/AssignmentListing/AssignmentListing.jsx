import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './AssignmentListing.scss';

const AssignmentListing = ({ onSelectAssignment }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/assignments')
            .then(res => {
                setAssignments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading assignments...</div>;

    return (
        <div className="assignment-listing">
            <h2 className="assignment-listing__title">Available Assignments</h2>
            <div className="assignment-listing__grid">
                {assignments.map(asm => (
                    <div key={asm._id} className="assignment-card">
                        <div className={`assignment-card__badge assignment-card__badge--${asm.difficulty.toLowerCase()}`}>
                            {asm.difficulty}
                        </div>
                        <h3 className="assignment-card__name">{asm.title}</h3>
                        <p className="assignment-card__desc">{asm.description}</p>
                        <button
                            className="btn btn--primary assignment-card__btn"
                            onClick={() => onSelectAssignment(asm._id)}
                        >
                            Start Practice
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentListing;
