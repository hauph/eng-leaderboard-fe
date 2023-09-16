<template>
    <div>
        <h1>CSV File Upload</h1>
        <div class="input-wrapper">
            <label for="textInput">Who is uploading result file?</label>
            <!-- <input type="text" ref="textInput" @change="handleTextChange" /> -->
            <select ref="nameSelect">
                <option value="">...</option>
                <option value="Chi Pham">Chi Pham</option>
                <option value="Hau Pham">Hau Pham</option>
                <option value="Nam Nguyen">Nam Nguyen</option>
                <option value="Ngoc Nguyen">Ngoc Nguyen</option>
                <option value="Tam Nguyen">Tam Nguyen</option>
                <option value="Tammy Ho">Tammy Ho</option>
            </select>
        </div>
        <!-- <label for="fileInput">Result file:</label> -->
        <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" />
        <button @click="uploadCSV">Upload</button>
        <div class="btn--home">
            <router-link to="/">Go to Home</router-link>
        </div>
    </div>
</template>
  
<script lang="ts">
import { toast } from 'vue3-toastify';
import { SCORE_ENDPOINTS } from '../endpoints';
import { Player } from '../interfaces'

export default {
    name: 'Admin',
    data() {
        return {
            csvData: null as string | null,
            extractedData: [],
        };
    },
    methods: {
        readFile(file: File) {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (!event.target) {
                    return;
                }
                const contents = event.target.result;
                this.csvData = contents as string;
            };

            reader.readAsText(file);
        },
        handleTextChange(event: Event) {
            const textInput = event.target as HTMLInputElement;
            this.csvData = textInput.value;
        },
        handleFileChange(event: Event) {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                this.readFile(fileInput.files[0]);
            }
        },
        async uploadCSV() {
            if (!this.csvData) {
                alert('Please select a CSV file to upload.');
                return;
            }

            const uploader = (this.$refs.nameSelect as HTMLInputElement).value;
            if (uploader.length === 0) {
                alert('Please select a name.');
                return;
            }

            const arrayData = this.csvData.split('\n');
            const body = arrayData.slice(2).reduce((acc: Player[], row) => {
                const arrayPerRow = row.split(',');
                const data = {
                    name: arrayPerRow[1],
                    score: parseInt(arrayPerRow.at(-1) as string),
                    uploader
                };
                acc.push(data);
                return acc;
            }, []);
            body.sort((a, b) => b.score - a.score);

            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                // Send the CSV file to the backend
                const response = await fetch(`${apiUrl}${SCORE_ENDPOINTS}`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                });
                if (response.ok) {
                    toast.success("Leaderboard has been updated", {
                        autoClose: 2000,
                    });
                } else {
                    toast.error("Something went wrong", {
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error("Something went wrong", {
                    autoClose: 2000,
                });
            }
        },
    },
};
</script>

<style scoped lang="scss">
.input-wrapper {
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;

    input {
        width: 100%;
    }
}

.btn--home {
    margin-top: 20px;
}
</style>

