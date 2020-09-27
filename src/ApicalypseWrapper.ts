export class Apicalypse {
    public data: string;

    constructor() {
        this.data = '';
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fields(fields: any): Apicalypse {
        if (fields) {
            let fieldsString = (fields && fields.constructor === Array) ? fields.join(",") : fields;
            fieldsString = fieldsString ? fieldsString.replace(/\s/g, '') : '';
            this.data += `fields ${fieldsString};`;
        }

        return this;
    }

    sort(field: string, direction: string): Apicalypse {
        if (field) {
            if (field.toLowerCase().endsWith(' desc') || field.toLowerCase().endsWith(' asc')) {
                this.data += `sort ${field};`;
            } else {
                this.data += `sort ${field} ${direction || "asc"};`;
            }
        }

        return this;
    }

    limit(limit: number): Apicalypse {
        if (limit) {
            this.data += `limit ${limit};`;
        }

        return this;
    }

    offset(offset: number): Apicalypse {
        if (offset) {
            this.data += `offset ${offset};`;
        }

        return this;
    }

    search(search: string): Apicalypse {
        if (search) {
            this.data += `search '${search}';`;
        }

        return this;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    where(filters: any): Apicalypse {
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
