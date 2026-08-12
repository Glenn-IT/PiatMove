package com.piatmove.driver.ui.requests

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.piatmove.core.utils.Resource
import com.piatmove.driver.databinding.FragmentDriverRequestsBinding
import com.piatmove.driver.ui.home.DriverViewModel

class DriverRequestsFragment : Fragment() {

    private var _binding: FragmentDriverRequestsBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: DriverViewModel
    private lateinit var adapter: RideRequestsAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDriverRequestsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        adapter = RideRequestsAdapter { booking ->
            startActivity(
                Intent(requireContext(), RideRequestActivity::class.java)
                    .putExtra(RideRequestActivity.EXTRA_BOOKING_ID, booking.id)
            )
        }

        binding.recyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter       = this@DriverRequestsFragment.adapter
        }

        binding.btnRefresh.setOnClickListener { viewModel.loadRequests() }

        viewModel.requests.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.recyclerView.visibility = View.GONE
                    binding.emptyState.visibility   = View.GONE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    val list = state.data ?: emptyList()
                    if (list.isEmpty()) {
                        binding.recyclerView.visibility = View.GONE
                        binding.emptyState.visibility   = View.VISIBLE
                    } else {
                        binding.recyclerView.visibility = View.VISIBLE
                        binding.emptyState.visibility   = View.GONE
                        adapter.submitList(list)
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility  = View.GONE
                    binding.recyclerView.visibility = View.GONE
                    binding.emptyState.visibility   = View.VISIBLE
                }
            }
        }

        viewModel.loadRequests()
    }

    override fun onResume() {
        super.onResume()
        viewModel.loadRequests()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
