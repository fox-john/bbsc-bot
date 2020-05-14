export class Apicalypse {
    public data: string;

    constructor() {
        this.data = '';
    }

    fields(fields) {
        if (fields) {
            let fieldsString = (fields && fields.constructor === Array) ? fields.join(",") : fields;
            fieldsString = fieldsString ? fieldsString.replace(/\s/g, '') : '';
            this.data += `fields ${fieldsString};`;
        }

        return this;
    }

    sort(field, direction) {
        if (field) {
            if (field.toLowerCase().endsWith(' desc') || field.toLowerCase().endsWith(' asc')) {
                this.data += `sort ${field};`;
            } else {
                this.data += `sort ${field} ${direction || "asc"};`;
            }
        }

        return this;
    }

    limit(limit) {
        if (limit) {
            this.data += `limit ${limit};`;
        }

        return this;
    }

    offset(offset) {
        if (offset) {
            this.data += `offset ${offset};`;
        }

        return this;
    }

    search(search) {
        if (search) {
            this.data += `search '${search}';`;
        }

        return this;
    }

    where(filters) {
        if (filters) {
            if (filters.constructor === Array) {
                this.data += `where ${filters.join(' & ')};`;
            } else {
                this.data += `where ${filters.trim()};`;
            }
        }

        return this;
    }
}
