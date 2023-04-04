import { useState } from 'react';
import { Form } from 'react-bootstrap';
import React from 'react';

export default function PrivacyComponent() {
    const [viewable, setViewable] = useState("Select Privacy")

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setViewable(event.target.value)
    }

    return (
        <Form>
            <Form.Label>Select Privacy</Form.Label>
            <Form.Select value={viewable} onChange={handleChange}>
                <option value="In House Open Mat">In House Open Mat</option>
                <option value="public">Public Open Mat</option>
            </Form.Select>
        </Form>
    )
}
