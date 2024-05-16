  document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
        alert(message);
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    const addEventToModeSelect = (selectElement) => {
      console.log("Adding event to: ", selectElement) 
      selectElement.addEventListener('change', function() {
        updateClassOptions(this);
      });
    };


    const flightDetailsContainer = document.getElementById('flightDetailsRows');
    flightDetailsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-row')) {
            const rowToDelete = event.target.closest('tr');
            if (rowToDelete) {
                rowToDelete.remove();
            }
        }
    });

    // Add event listener to all existing mode selects (including the initial one)
    document.querySelectorAll('.mode-select').forEach(addEventToModeSelect);

    document.getElementById('addFlightDetailRow').addEventListener('click', function() {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
          <select name="Mode" class="mode-select mt-1 block w-15 border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Air</option>
            <option>Train</option>
          </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <input type="date" class="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" name="Date">
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <input type="time" class="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" name="Time">
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <select name="from" class="mt-1 block w-32 border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <!-- Dynamically populate or repeat options here -->
            <option value="">Select City</option>
                                                      <option value="Agartala, Tripura">Agartala, Tripura</option>
      <option value="Agatti Island, Lakshadweep">Agatti Island, Lakshadweep</option>
      <option value="Agra, Uttar Pradesh">Agra, Uttar Pradesh</option>
      <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
      <option value="Aizawl, Mizoram">Aizawl, Mizoram</option>
      <option value="Akola, Maharashtra">Akola, Maharashtra</option>
      <option value="Allahabad, Uttar Pradesh">Allahabad, Uttar Pradesh</option>
      <option value="Along, Arunachal Pradesh">Along, Arunachal Pradesh</option>
      <option value="Amritsar, Punjab">Amritsar, Punjab</option>
      <option value="Aurangabad, Maharashtra">Aurangabad, Maharashtra</option>
      <option value="Bagdogra, West Bengal">Bagdogra, West Bengal</option>
      <option value="Balurghat, West Bengal">Balurghat, West Bengal</option>
      <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
      <option value="Bellary, Karnataka">Bellary, Karnataka</option>
      <option value="Bhatinda, Punjab">Bhatinda, Punjab</option>
      <option value="Bhavnagar, Gujarat">Bhavnagar, Gujarat</option>
      <option value="Bhopal, Madhya Pradesh">Bhopal, Madhya Pradesh</option>
      <option value="Bhubaneswar, Odisha">Bhubaneswar, Odisha</option>
      <option value="Bhuj, Gujarat">Bhuj, Gujarat</option>
      <option value="Bikaner, Rajasthan">Bikaner, Rajasthan</option>
      <option value="Bilaspur, Chhattisgarh">Bilaspur, Chhattisgarh</option>
      <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
      <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
      <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
      <option value="Kochi, Kerala">Kochi, Kerala</option>
      <option value="Cuddapah, Andhra Pradesh">Cuddapah, Andhra Pradesh</option>
      <option value="Dehradun, Uttarakhand">Dehradun, Uttarakhand</option>
      <option value="New Delhi, Delhi">New Delhi, Delhi</option>
      <option value="Dharamshala, Himachal Pradesh">Dharamshala, Himachal Pradesh</option>
      <option value="Dibrugarh, Assam">Dibrugarh, Assam</option>
      <option value="Dimapur, Nagaland">Dimapur, Nagaland</option>
      <option value="Diu, Daman and Diu">Diu, Daman and Diu</option>
      <option value="Dundigul, Telangana">Dundigul, Telangana</option>
      <option value="Dhanbad, Jharkhand">Dhanbad, Jharkhand</option>
      <option value="Gaya, Bihar">Gaya, Bihar</option>
      <option value="Goa, Goa">Goa, Goa</option>
      <option value="Gorakhpur, Uttar Pradesh">Gorakhpur, Uttar Pradesh</option>
      <option value="Guna, Madhya Pradesh">Guna, Madhya Pradesh</option>
      <option value="Guwahati, Assam">Guwahati, Assam</option>
      <option value="Gwalior, Madhya Pradesh">Gwalior, Madhya Pradesh</option>
      <option value="Hissar, Haryana">Hissar, Haryana</option>
      <option value="Hubli, Karnataka">Hubli, Karnataka</option>
      <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
      <option value="Imphal, Manipur">Imphal, Manipur</option>
      <option value="Indore, Madhya Pradesh">Indore, Madhya Pradesh</option>
      <option value="Jabalpur, Madhya Pradesh">Jabalpur, Madhya Pradesh</option>
      <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
      <option value="Jaisalmer, Rajasthan">Jaisalmer, Rajasthan</option>
      <option value="Jammu, Jammu and Kashmir">Jammu, Jammu and Kashmir</option>
      <option value="Jamnagar, Gujarat">Jamnagar, Gujarat</option>
      <option value="Jamshedpur, Jharkhand">Jamshedpur, Jharkhand</option>
      <option value="Jorhat, Assam">Jorhat, Assam</option>
      <option value="Kailashahar, Tripura">Kailashahar, Tripura</option>
      <option value="Kamalpur, Tripura">Kamalpur, Tripura</option>
      <option value="Kandla, Gujarat">Kandla, Gujarat</option>
      <option value="Kanpur, Uttar Pradesh">Kanpur, Uttar Pradesh</option>
      <option value="Keshod, Gujarat">Keshod, Gujarat</option>
      <option value="Khajuraho, Madhya Pradesh">Khajuraho, Madhya Pradesh</option>
      <option value="Khowai, Tripura">Khowai, Tripura</option>
      <option value="Kochi, Kerala">Kochi, Kerala</option>
      <option value="Kolhapur, Maharashtra">Kolhapur, Maharashtra</option>
      <option value="Kozhikode, Kerala">Kozhikode, Kerala</option>
      <option value="Leh, Ladakh">Leh, Ladakh</option>
      <option value="Lilabari, Assam">Lilabari, Assam</option>
      <option value="Lucknow, Uttar Pradesh">Lucknow, Uttar Pradesh</option>
      <option value="Ludhiana, Punjab">Ludhiana, Punjab</option>
      <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu</option>
      <option value="Malda, West Bengal">Malda, West Bengal</option>
      <option value="Mangalore, Karnataka">
          <option value="Mohanbari, Assam">Mohanbari, Assam</option>
  <option value="Muzaffarnagar, Uttar Pradesh">Muzaffarnagar, Uttar Pradesh</option>
  <option value="Mysore, Karnataka">Mysore, Karnataka</option>
  <option value="Nagpur, Maharashtra">Nagpur, Maharashtra</option>
  <option value="Nanded, Maharashtra">Nanded, Maharashtra</option>
  <option value="Nashik, Maharashtra">Nashik, Maharashtra</option>
  <option value="Pantnagar, Uttarakhand">Pantnagar, Uttarakhand</option>
  <option value="Pasighat, Arunachal Pradesh">Pasighat, Arunachal Pradesh</option>
  <option value="Pathankot, Punjab">Pathankot, Punjab</option>
  <option value="Patna, Bihar">Patna, Bihar</option>
  <option value="Pondicherry, Puducherry">Pondicherry, Puducherry</option>
  <option value="Porbandar, Gujarat">Porbandar, Gujarat</option>
  <option value="Port Blair, Andaman and Nicobar Islands">Port Blair, Andaman and Nicobar Islands</option>
  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
  <option value="Raipur, Chhattisgarh">Raipur, Chhattisgarh</option>
  <option value="Rajahmundry, Andhra Pradesh">Rajahmundry, Andhra Pradesh</option>
  <option value="Rajkot, Gujarat">Rajkot, Gujarat</option>
  <option value="Ramagundam, Telangana">Ramagundam, Telangana</option>
  <option value="Ranchi, Jharkhand">Ranchi, Jharkhand</option>
  <option value="Ratnagiri, Maharashtra">Ratnagiri, Maharashtra</option>
  <option value="Rewa, Madhya Pradesh">Rewa, Madhya Pradesh</option>
  <option value="Rourkela, Odisha">Rourkela, Odisha</option>
  <option value="Shirdi, Maharashtra">Shirdi, Maharashtra</option>
  <option value="Silchar, Assam">Silchar, Assam</option>
  <option value="Shimla, Himachal Pradesh">Shimla, Himachal Pradesh</option>
  <option value="Solapur, Maharashtra">Solapur, Maharashtra</option>
  <option value="Surat, Gujarat">Surat, Gujarat</option>
  <option value="Tezpur, Assam">Tezpur, Assam</option>
  <option value="Tiruchirappalli, Tamil Nadu">Tiruchirappalli, Tamil Nadu</option>
  <option value="Tirupati, Andhra Pradesh">Tirupati, Andhra Pradesh</option>
  <option value="Thiruvananthapuram, Kerala">Thiruvananthapuram, Kerala</option>

            </select>
            
            
          </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <select name="to" class="mt-1 block w-32 border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <!-- Dynamically populate or repeat options here -->
            <option value="">Select City</option>
                                                      <option value="Agartala, Tripura">Agartala, Tripura</option>
      <option value="Agatti Island, Lakshadweep">Agatti Island, Lakshadweep</option>
      <option value="Agra, Uttar Pradesh">Agra, Uttar Pradesh</option>
      <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
      <option value="Aizawl, Mizoram">Aizawl, Mizoram</option>
      <option value="Akola, Maharashtra">Akola, Maharashtra</option>
      <option value="Allahabad, Uttar Pradesh">Allahabad, Uttar Pradesh</option>
      <option value="Along, Arunachal Pradesh">Along, Arunachal Pradesh</option>
      <option value="Amritsar, Punjab">Amritsar, Punjab</option>
      <option value="Aurangabad, Maharashtra">Aurangabad, Maharashtra</option>
      <option value="Bagdogra, West Bengal">Bagdogra, West Bengal</option>
      <option value="Balurghat, West Bengal">Balurghat, West Bengal</option>
      <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
      <option value="Bellary, Karnataka">Bellary, Karnataka</option>
      <option value="Bhatinda, Punjab">Bhatinda, Punjab</option>
      <option value="Bhavnagar, Gujarat">Bhavnagar, Gujarat</option>
      <option value="Bhopal, Madhya Pradesh">Bhopal, Madhya Pradesh</option>
      <option value="Bhubaneswar, Odisha">Bhubaneswar, Odisha</option>
      <option value="Bhuj, Gujarat">Bhuj, Gujarat</option>
      <option value="Bikaner, Rajasthan">Bikaner, Rajasthan</option>
      <option value="Bilaspur, Chhattisgarh">Bilaspur, Chhattisgarh</option>
      <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
      <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
      <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
      <option value="Kochi, Kerala">Kochi, Kerala</option>
      <option value="Cuddapah, Andhra Pradesh">Cuddapah, Andhra Pradesh</option>
      <option value="Dehradun, Uttarakhand">Dehradun, Uttarakhand</option>
      <option value="New Delhi, Delhi">New Delhi, Delhi</option>
      <option value="Dharamshala, Himachal Pradesh">Dharamshala, Himachal Pradesh</option>
      <option value="Dibrugarh, Assam">Dibrugarh, Assam</option>
      <option value="Dimapur, Nagaland">Dimapur, Nagaland</option>
      <option value="Diu, Daman and Diu">Diu, Daman and Diu</option>
      <option value="Dundigul, Telangana">Dundigul, Telangana</option>
      <option value="Dhanbad, Jharkhand">Dhanbad, Jharkhand</option>
      <option value="Gaya, Bihar">Gaya, Bihar</option>
      <option value="Goa, Goa">Goa, Goa</option>
      <option value="Gorakhpur, Uttar Pradesh">Gorakhpur, Uttar Pradesh</option>
      <option value="Guna, Madhya Pradesh">Guna, Madhya Pradesh</option>
      <option value="Guwahati, Assam">Guwahati, Assam</option>
      <option value="Gwalior, Madhya Pradesh">Gwalior, Madhya Pradesh</option>
      <option value="Hissar, Haryana">Hissar, Haryana</option>
      <option value="Hubli, Karnataka">Hubli, Karnataka</option>
      <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
      <option value="Imphal, Manipur">Imphal, Manipur</option>
      <option value="Indore, Madhya Pradesh">Indore, Madhya Pradesh</option>
      <option value="Jabalpur, Madhya Pradesh">Jabalpur, Madhya Pradesh</option>
      <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
      <option value="Jaisalmer, Rajasthan">Jaisalmer, Rajasthan</option>
      <option value="Jammu, Jammu and Kashmir">Jammu, Jammu and Kashmir</option>
      <option value="Jamnagar, Gujarat">Jamnagar, Gujarat</option>
      <option value="Jamshedpur, Jharkhand">Jamshedpur, Jharkhand</option>
      <option value="Jorhat, Assam">Jorhat, Assam</option>
      <option value="Kailashahar, Tripura">Kailashahar, Tripura</option>
      <option value="Kamalpur, Tripura">Kamalpur, Tripura</option>
      <option value="Kandla, Gujarat">Kandla, Gujarat</option>
      <option value="Kanpur, Uttar Pradesh">Kanpur, Uttar Pradesh</option>
      <option value="Keshod, Gujarat">Keshod, Gujarat</option>
      <option value="Khajuraho, Madhya Pradesh">Khajuraho, Madhya Pradesh</option>
      <option value="Khowai, Tripura">Khowai, Tripura</option>
      <option value="Kochi, Kerala">Kochi, Kerala</option>
      <option value="Kolhapur, Maharashtra">Kolhapur, Maharashtra</option>
      <option value="Kozhikode, Kerala">Kozhikode, Kerala</option>
      <option value="Leh, Ladakh">Leh, Ladakh</option>
      <option value="Lilabari, Assam">Lilabari, Assam</option>
      <option value="Lucknow, Uttar Pradesh">Lucknow, Uttar Pradesh</option>
      <option value="Ludhiana, Punjab">Ludhiana, Punjab</option>
      <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu</option>
      <option value="Malda, West Bengal">Malda, West Bengal</option>
      <option value="Mangalore, Karnataka">
          <option value="Mohanbari, Assam">Mohanbari, Assam</option>
  <option value="Muzaffarnagar, Uttar Pradesh">Muzaffarnagar, Uttar Pradesh</option>
  <option value="Mysore, Karnataka">Mysore, Karnataka</option>
  <option value="Nagpur, Maharashtra">Nagpur, Maharashtra</option>
  <option value="Nanded, Maharashtra">Nanded, Maharashtra</option>
  <option value="Nashik, Maharashtra">Nashik, Maharashtra</option>
  <option value="Pantnagar, Uttarakhand">Pantnagar, Uttarakhand</option>
  <option value="Pasighat, Arunachal Pradesh">Pasighat, Arunachal Pradesh</option>
  <option value="Pathankot, Punjab">Pathankot, Punjab</option>
  <option value="Patna, Bihar">Patna, Bihar</option>
  <option value="Pondicherry, Puducherry">Pondicherry, Puducherry</option>
  <option value="Porbandar, Gujarat">Porbandar, Gujarat</option>
  <option value="Port Blair, Andaman and Nicobar Islands">Port Blair, Andaman and Nicobar Islands</option>
  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
  <option value="Raipur, Chhattisgarh">Raipur, Chhattisgarh</option>
  <option value="Rajahmundry, Andhra Pradesh">Rajahmundry, Andhra Pradesh</option>
  <option value="Rajkot, Gujarat">Rajkot, Gujarat</option>
  <option value="Ramagundam, Telangana">Ramagundam, Telangana</option>
  <option value="Ranchi, Jharkhand">Ranchi, Jharkhand</option>
  <option value="Ratnagiri, Maharashtra">Ratnagiri, Maharashtra</option>
  <option value="Rewa, Madhya Pradesh">Rewa, Madhya Pradesh</option>
  <option value="Rourkela, Odisha">Rourkela, Odisha</option>
  <option value="Shirdi, Maharashtra">Shirdi, Maharashtra</option>
  <option value="Silchar, Assam">Silchar, Assam</option>
  <option value="Shimla, Himachal Pradesh">Shimla, Himachal Pradesh</option>
  <option value="Solapur, Maharashtra">Solapur, Maharashtra</option>
  <option value="Surat, Gujarat">Surat, Gujarat</option>
  <option value="Tezpur, Assam">Tezpur, Assam</option>
  <option value="Tiruchirappalli, Tamil Nadu">Tiruchirappalli, Tamil Nadu</option>
  <option value="Tirupati, Andhra Pradesh">Tirupati, Andhra Pradesh</option>
  <option value="Thiruvananthapuram, Kerala">Thiruvananthapuram, Kerala</option>

            </select>
            
            
          </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <select name="Class" class="class-select mt-1 block w-25 border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Economy</option>
            <option>Business</option>
            <!-- More options will be dynamically inserted based on the mode -->
          </select>
        </td>
        <td>

        <button type="button" class="delete-row mt-3 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
  Delete
</button>
                                              </td>
      `;
        
     
    

      document.getElementById('flightDetailsRows').appendChild(newRow);
      addEventToModeSelect(newRow.querySelector('.mode-select'));
    });

  
    
    function updateClassOptions(selectElement) {
      const classSelect = selectElement.closest('tr').querySelector('.class-select');
      const airOptions = `
        <option>Economy</option>
        <option>Business</option>
      `;
      const trainOptions = `
        <option>First Class (FC)</option>
        <option>AC Chair (CC)</option>
        <option>Sleeper (SL)</option>
        <option>Second Class (2S)</option>
        <option>Unreserved/General Class (2S)</option>
      `;
      classSelect.innerHTML = selectElement.value === 'Air' ? airOptions : trainOptions;
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('NavBar');
    const stickyOffset = navbar.offsetTop;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset >= stickyOffset) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    });
  });

  document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('documents', file);

    fetch('/api/auth/upload-file', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('uploadStatus').innerText = data.message + ' Filename: ' + data.fileName;
        // You can also store the returned file path in a hidden input if you need to submit it with the final form
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
  });